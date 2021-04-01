from personalColor.src.personal_color_analysis import personal_color
import argparse
import os
import matplotlib.pyplot as plt

def main(imgpath):
    return personal_color.analysis(imgpath)

"""
def main():
    # 인자값 받을 인스턴스 생성
    parser = argparse.ArgumentParser(description = 'Please input your image.')

    # 입력받을 인자값 등록
    parser.add_argument('--image', required = False, help='input .jpg or .png file')
    parser.add_argument('--dir', required = False, help='input image directory')

    # 입력받은 인자값을 args에 저장
    args = parser.parse_args()
    a = plt.imread(args.image)
    plt.imshow(a) # 흑백으로 보고 싶을 땐, plt.imshow(a, cmap='gray')
    ##################################
    #         a single image         #
    ##################################
    if args.image != None:
        imgpath = args.image
        personal_color.analysis(imgpath)

    ##################################
    #  multiple images in directory  #
    ##################################
    elif args.dir != None:
        dirpath = args.dir
        imgs = os.listdir(dirpath)
        for imgpath in imgs:
            #print(os.path.join(dirpath, imgpath))
            personal_color.analysis(os.path.join(dirpath, imgpath))"""

if __name__ == '__main__':
    main('./img.JPG')
