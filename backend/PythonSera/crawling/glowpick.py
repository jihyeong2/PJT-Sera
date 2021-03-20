from urllib.request import urlopen
from selenium import webdriver
from selenium.webdriver import ActionChains
import time
import os
import re
import json


path = './data/GP/'
def setStdCategory():
    std_category = []
    with open(path + 'glowpick_ctg.txt', 'r',encoding='utf-8') as f:
        temp = f.readlines()
        for c in temp:
            std_category.append(c.strip())
    return std_category

def scrolling(driver):
    ul = driver.find_element_by_class_name('contents__reviews')
    start_height = ul.size['height']

    target = driver.find_element_by_id('gp-footer')
    start = driver.find_element_by_id('gp-default-top')
    loop = True
    actions = ActionChains(driver)

    while loop:
        actions.move_to_element(start).perform()
        actions.move_to_element(target).perform()
        time.sleep(0.5)

        # check loop
        ul = driver.find_element_by_class_name('contents__reviews')
        current_height = ul.size['height']
        if start_height == current_height:
            loop = False
        else:
            start_height = current_height

def getProductInfo(driver):
    p_name = driver.find_element_by_class_name('product-main-info__product_name__text').text
    tmp = driver.find_element_by_class_name('product-main-info__volume_price').text.split('/')
    p_volume = tmp[0].strip()
    p_price = tmp[1].strip()
    p_brand = driver.find_element_by_class_name('brand_info__brand-name').text
    p_discription = driver.find_element_by_class_name('info__description').text
    p_tags = []
    tags = driver.find_elements_by_class_name('info__tags')
    for t in tags:
        p_tags.append(t.text)
    
    img = driver.find_element_by_class_name('product-image__detail--desktop').find_element_by_tag_name('meta').get_attribute('content')
    elements = []
    try:
        btn_elements = driver.find_element_by_class_name('ingredient')
        btn_elements = btn_elements.find_element_by_tag_name('button')
        btn_elements.click()
        time.sleep(0.5)
        e_list = driver.find_elements_by_class_name('list-ingredient__item')
        elements = []
        for e in e_list:
            level = e.find_element_by_class_name('list-ingredient__item__ewg-level').text
            korean = e.find_element_by_class_name('list-ingredient__item__text-korean').text
            english = e.find_element_by_class_name('list-ingredient__item__text-english').text
            purpose = e.find_element_by_class_name('list-ingredient__item__text-purpose').text
            elements.append({'level': level, 'korean': korean, 'english': english, 'purpose': purpose})
        btn_close = driver.find_element_by_id('gp-popup-bg').find_element_by_tag_name('button')
        btn_close.click()
    except:
        pass
    colors = ''
    try:
        colors = driver.find_element_by_class_name('info__color-type-list').text.strip()
    except:
        pass
    return {'name':p_name, 'image' : img, 'volume':p_volume, 'price':p_price, 'brand':p_brand, 'discription' :p_discription, 'tags':p_tags, 'elements':elements, 'colors':colors} 

def getProductReviews(id, driver):
    result = []
    reviews = driver.find_elements_by_class_name('review-list-item')
    for review in reviews:
        infos = review.find_element_by_class_name('info').find_element_by_class_name('txt').text.split('·')
        age = (int)(infos[0].strip()[:-1])
        skin_type = infos[1].strip()
        icons = review.find_elements_by_class_name('icon-sprite')
        gender = icons[0].get_attribute('class').split(' ')[-1][-1]
        score = icons[1].get_attribute('class').split(' ')[-1].split('-')[1]
        gender = '여' if gender == 'f' else '남'
        if score == 'best': score = 5
        elif score == 'good': score = 4
        elif score == 'soso': score = 3
        elif score == 'bad': score = 2
        else : score = 1
        content = review.find_element_by_class_name('review').text
        
        review_info = {'item':id, 'age' : age, 'skinType' : skin_type, 'gender':gender, 'score':score, 'content':content}
        result.append(review_info)
    return result

def writeJsonFile(start_num, end_num, items, reviews):
    file_path = path + "/output/"
    if not os.path.exists(file_path):
        os.makedirs(file_path)
    item_outpath = file_path + "GP_items_"+str(start_num)+"-"+str(end_num)+".json"
    review_outpath = file_path + "GP_reviews_" + str(start_num)+"-"+str(end_num)+ ".json"
    
    with open(item_outpath, 'w', encoding="utf-8") as of:
        json.dump(items, of, ensure_ascii=False, indent="\t")
    with open(review_outpath, 'w', encoding="utf-8") as of:
        json.dump(reviews, of, ensure_ascii=False, indent="\t")

def getProducts(start_num, end_num):
    std_category = setStdCategory()
    options = webdriver.ChromeOptions() 
    options.add_experimental_option("excludeSwitches", ["enable-logging"])

    baseUrl = 'https://www.glowpick.com/product/'
    driver = webdriver.Chrome(options=options, executable_path='chrome/chromedriver')

    items = []
    reviews = []
    for i in range(start_num, end_num+1): 
        url = baseUrl + str(i)
        driver.get(url=url)  # url open
        time.sleep(1)
        print(str(i)+" / "+ str(end_num))
        try :
            p_name = driver.find_element_by_class_name('product-main-info__product_name__text').text
        except:
            continue
        if '단종' in p_name:
            continue
        categories = driver.find_element_by_class_name('info__category').text.split(' ')
        category = []
        for ctg in categories:
            if ctg not in category:
                category.append(ctg)
        if category[0] == '남성':
            c1 = category.pop(0)
            c2 = category.pop(0)
            category.insert(0," ".join([c1, c2]))
        
        if category[0] not in std_category:
            continue
        item = getProductInfo(driver)
        item['id'] = i
        item['category'] = category
        
        scrolling(driver)
        time.sleep(0.5)
        item_reviews = getProductReviews(item['id'], driver)

        items.append(item)
        reviews += item_reviews

    writeJsonFile(start_num, end_num, items, reviews)
    driver.quit()
    
def getItemsReviews():
    file_path = path + 'output/'
    file_list = os.listdir(file_path)
    items = []
    reviews = []

    for f_name in file_list:
        with open(file_path + f_name, 'r',encoding='utf-8') as f:
            json_data = json.load(f)
            if 'item' in f_name:
                items += json_data
            else:
                reviews += json_data
    
    return items, reviews

if __name__ == '__main__':
    # 숫자 바꿔서 크롤링 예시 (10001~20000) #145498
    getProducts(1,10000)

