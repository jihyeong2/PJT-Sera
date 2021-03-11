import urllib3
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import os
import re
import json


path = './data/OY'

def write_OY_categories():
    http = urllib3.PoolManager()
    url = "https://www.oliveyoung.co.kr/store/main/main.do?oy=0"

    response = http.request('GET', url)
    soup = BeautifulSoup(response.data)
    categories = soup.findAll("div", "sub_menu_box")
    category_list = []
    for c in categories:
        category_list += c.findAll("ul")
    category_dict = {0 : [0,1,3], 2: [0,2,3], 5: [0,1], 7: [0,1,3]}
    category = []
    for i in category_dict.keys():
        temp = category_list[i]
        categories = temp.findAll("a")
        for j in category_dict[i]:
            category.append(categories[j]["data-ref-dispcatno"])
    with open(path+'/OY_category.txt', 'w') as f:
        for ctg in category:
            f.write(ctg + "\n")

def get_OY_categories():
    with open(path+'/OY_category.txt', 'r') as f:
        category = f.readlines()
        for i, ctg in enumerate(category):
            category[i] = ctg.strip()
    return category

def write_OY_item_pages():
    http = urllib3.PoolManager()
    category = get_OY_categories()
    print(category)
    pages = []
    for ctg in category:
        preUrl = "https://www.oliveyoung.co.kr/store/display/getMCategoryList.do?dispCatNo=" + ctg + "&fltDispCatNo=&prdSort=01&pageIdx="
        lastUrl = "&rowsPerPage=24&searchTypeSort=btn_thumb&plusButtonFlag=N&isLoginCnt=0&aShowCnt=0&bShowCnt=0&cShowCnt=0&trackingCd=Drawer_Cat" + ctg + "_Cat"
        idx = 1
        while (1):
            url = preUrl + str(idx) + lastUrl
            response = http.request('GET', url)
            soup = BeautifulSoup(response.data)
            item_list = soup.findAll("div", "prd_info")
            if len(item_list) < 1: break
            for item in item_list:
                item_page = item.findAll("a")[0]["href"]
                item_page = item_page.split("&trackingCd")[0]
                pages.append(item_page)
            idx += 1
            time.sleep(1)
        print(ctg+" done")
        with open(path + "/page/" + ctg + "_page.txt", "w") as f:
            for page in pages:
                f.write(page + "\n")
                
def get_OY_item_review():
    path_dir = path + "/page/"
    file_list = os.listdir(path_dir)
    options = webdriver.ChromeOptions() 
    options.add_experimental_option("excludeSwitches", ["enable-logging"])

    for filename in file_list:
        page_list = []
        items = []
        idx = 1
        review_data = []
        with open(path_dir + filename, "r") as f:
            page_list = f.readlines()
            for page in page_list:
                driver = webdriver.Chrome(options=options, executable_path='chrome/chromedriver')
                driver.get(url=page)
                time.sleep(0.5)
                # 카테고리
                ctg = driver.find_elements_by_class_name('cate_y')
                ctgs = []
                for c in ctg:
                    ctgs.append(c.text)
                category = ">".join(ctgs)
                #브랙드 이름
                brand = driver.find_element_by_id('moveBrandShop').text
                #상품 이름
                item_name = driver.find_element_by_class_name('prd_name').text
                #구매 정보로 이동
                info_btn = driver.find_element_by_id('buyInfo')
                info_btn.click()
                time.sleep(0.5)
                #구매 정보들
                infos = driver.find_element_by_id('artcInfo')
                info_dd = infos.find_elements_by_tag_name('dd')
                #상품 용량
                volume = info_dd[0].text
                #상품 구성 성분
                elements = info_dd[6].text.split(",")
                item_dic = {'id': idx,'item_name': item_name, 'brand': brand, 'category': category, 'volume': volume, 'elements': elements}
                items.append(item_dic)
                
                
                item_review = []
                check = True
                page_idx = 1
                lose = 0
                while(check):
                    #리뷰 정보로 이동
                    review_btn = driver.find_element_by_class_name('goods_reputation')
                    review_cnt = int(review_btn.find_element_by_tag_name('span').text[1:-1].replace(',',''))
                    review_btn.click()
                    time.sleep(0.5)
                    #리뷰
                    review_area = driver.find_element_by_id('gdasList')
                    reviews_user = review_area.find_elements_by_class_name('info')
                    reviews_content = review_area.find_elements_by_class_name('review_cont')
                    for (user, content) in zip(reviews_user, reviews_content):
                        #태그
                        try : #태그없는 리뷰 버림
                            tags = user.find_element_by_class_name('tag')
                            tags = tags.find_elements_by_tag_name('em')

                            tag = []
                            for t in tags:
                                tag.append(t.text)
                            tags = "/".join(tag)
                        except:
                            try:
                                poll_type = content.find_element_by_class_name('poll_type1')
                                tags = poll_type.find_element_by_tag_name('dd').text[:-5]
                            except :
                                lose += 1
                                continue
                        
                        #평점
                        score = content.find_element_by_class_name('point').text
                        score = re.findall(r"\d+", score)[-1]

                        #리뷰
                        try : #텍스트리뷰 없으면 버림
                            review_text = content.find_element_by_class_name('txt_inner').text
                        except:
                            continue
                        review_dict = {'item': idx, 'tags': tags, 'score': int(score), 'content': review_text}
                        item_review.append(review_dict)
                    if len(item_review) >= 500: break
                    #다음페이지로 넘어가기
                    print(str(10 * page_idx) + " / " + str(review_cnt))
                    page_idx += 1
                    pageing = driver.find_element_by_class_name('pageing')
                    try :
                        now = pageing.find_element_by_css_selector('strong+a')
                        now.click()
                    except:
                        check = False
                    time.sleep(0.5)
                review_data += item_review
                driver.quit()
                print(lose)
                # break
                file_path = path + "/output/" + filename[:-4] + "/"
                if not os.path.exists(file_path):
                    os.makedirs(file_path)
                item_outpath = file_path + "item_"+str(idx)+".json"
                review_outpath = file_path + "review_"+str(idx)+".json"
                
                with open(item_outpath, 'w', encoding="utf-8") as of:
                    json.dump(item_dic, of, ensure_ascii=False, indent="\t")
                with open(review_outpath, 'w', encoding="utf-8") as of:
                    json.dump(item_review, of, ensure_ascii=False, indent="\t")
                idx += 1
        break
    return items, review_data
if __name__ == "__main__":
    items, reviews = get_OY_item_review()
    
    # print(items, reviews)