import os
import json
import pandas as pd
import numpy as np

def readFile():
    path = './data'
    item_json = []
    review_json = []
    file_list = os.listdir(path)
    for filename in file_list:
        with open(path + '/' + filename, 'r', encoding='utf-8') as f:
            if 'item' in filename :
                item_json += json.load(f)
            else:
                review_json += json.load(f)
    return item_json, review_json

def initData():
    items, reviews = readFile()
    
    element = set()
    for jdic in items:
        [element.add(i["korean"]) for i in jdic["elements"]]
    
    element_dict = {ele:i for i, ele in enumerate(element)}
    n_element = len(element)
    idx2elemnt = {v:k for k, v in element_dict.items()}

    data = []
    item_idexes = []
    for jdic in items:
        vector = np.zeros(n_element)
        element_idx = [element_dict[i["korean"]] for i in jdic["elements"]]
        vector[element_idx] = 1
        data.append(vector)
        item_idexes.append(jdic["id"])

    data = np.stack(data)
    column = [k for k, v in sorted(element_dict.items(), key = lambda x:x[1])]
    
    df = pd.DataFrame(data, columns=column, index=item_idexes)
    print(df)





    # tag_df = pd.DataFrame(tags)
    # print(tag_df)
    # tag_df = tag_df.drop_duplicates()
    # print(tag_df)

    # element_df.columns([i for i in range(1,len(element_df.iterrows())+1)])
    # for e in elements:
    #     e['id'] = id
    #     id += 1
    # print([item['id'] for item in items], [element['id'] for element in elements])
    # item_element = np.zeros((len(items), len(elements)))
    # print(element_df[element_df['korean'] == j['korean']]['id'])
    # print(element_df[element_df['id'] == 1].index.tolist())
    # for i,item in enumerate(items):
    #     pd.DataFrame(item['elements'])
    # print(element_df)     

if __name__ == '__main__':
    initData()