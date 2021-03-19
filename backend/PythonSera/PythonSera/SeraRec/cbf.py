import os
import json
import pandas as pd
import numpy as np
import re

def readItemFile():
    path = '../../crawling/data/GP/output'
    item_json = []
    file_list = os.listdir(path)
    for filename in file_list:
        if 'item' in filename :
            with open(path + '/' + filename, 'r', encoding='utf-8') as f:
                item_json += json.load(f)
    return item_json

def readReviewFile():
    path = '../../crawling/data/GP/output'
    review_json = []
    file_list = os.listdir(path)
    for filename in file_list:
        if 'review' in filename :
            with open(path + '/' + filename, 'r', encoding='utf-8') as f:
                review_json += json.load(f)
    return review_json

def readSkinTypeFile():
    path = '../../crawling/data/피부타입'
    file_list = os.listdir(path)
    skin_elements = []

    for filename in file_list:
        helpful = []
        caution = []
        lines = []
        content = ''

        with open(path + "/" + filename, 'r', encoding='utf-8') as f:
            content = f.read()

        content = content.replace('\n\n','\n')
        content = re.split('도움성분|주의성분',content)
        skinType = content[0].strip()
        lines = content[1].strip().split('\n')

        for line in lines:
            if ',' not in line: continue
            sp = line.split(',')
            element = {'level': sp[0].strip(), 'korean': sp[1].strip()}
            if element not in helpful:
                helpful.append(element)
        
        lines = content[2].strip().split('\n')
        
        for line in lines:
            if ',' not in line: continue
            sp = line.split(',')
            element = {'level': sp[0].strip(), 'korean': sp[1].strip()}
            if element not in caution:
                caution.append(element)

        skin_elements.append({'skinType' : skinType, 'helpful' : helpful, 'caution' : caution})
    
    return skin_elements

def initData():
    items = readItemFile()
    # review = readReviewFile()
    help_caution = readSkinTypeFile()
    # element = set()
    # for jdic in items:
    #     [element.add(i["korean"]) for i in jdic["elements"]]
    element = set()
    for skin in help_caution:
        [element.add(i["korean"]) for i in skin["helpful"]]
        [element.add(i["korean"]) for i in skin["caution"]]
    
    element_dict = {i+1:ele for i, ele in enumerate(element)}
    n_element = len(element)
    element2idx = {v: k for k, v in element_dict.items()}
    # print(element2idx)

    data = []
    item_idexes = []
    for item in items:
        vector = np.zeros(n_element)
        element_idx = []
        for i in item["elements"]:
            if i["korean"] in element2idx.keys():
                element_idx.append(element2idx[i["korean"]]-1)
        # element_idx = [element_dict[e["korean"]] for e in item["elements"]]
        vector[element_idx] = 1
        data.append(vector)
        item_idexes.append(item["id"])
    data = np.stack(data)
    column = [i for i in element_dict.keys()]
    item_df = pd.DataFrame(data, columns=column, index=item_idexes)
    # print(item_df)

    skin_data = []
    skin_indexes = []
    for skin in help_caution:
        vector = np.zeros(n_element)
        element_idx = []
        for h in skin["helpful"]:
            if h["korean"] in element2idx.keys():
                element_idx.append(element2idx[h["korean"]]-1)
        for c in skin["caution"]:
            if c["korean"] in element2idx.keys():
                element_idx.append(element2idx[c["korean"]]-1)
        vector[element_idx] = 1
        skin_data.append(vector)
        skin_indexes.append(skin["skinType"])
    skin_data = np.stack(skin_data)
    column = [i for i in element_dict.keys()]
    skin_df = pd.DataFrame(skin_data, columns=column, index=skin_indexes)
    
    return item_df, skin_df

def tf_idf():
    item_df, skin_df = initData()
    N = skin_df.shape
    print(N)
    return 

if __name__ == '__main__':
    # initData()
    tf_idf()