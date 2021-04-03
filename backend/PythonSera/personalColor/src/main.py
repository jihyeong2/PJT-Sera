from personalColor.src.personal_color_analysis import personal_color
import argparse
import os
import matplotlib.pyplot as plt

def main(imgpath):
    return personal_color.analysis(imgpath)

if __name__ == '__main__':
    main('./img.JPG')
