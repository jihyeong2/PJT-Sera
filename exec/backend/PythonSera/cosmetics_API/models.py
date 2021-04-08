from django.db import models

# Create your models here.
class Item(models.Model):
    item_id = models.IntegerField()
    item_name = models.CharField(max_length=300)
    item_img = models.TextField()
    item_brand = models.CharField(max_length=300)
    category_large = models.CharField(max_length=300)
    category_middle = models.CharField(max_length=300)
    category_small = models.CharField(max_length=300)
    item_colors = models.TextField()
    item_volume = models.CharField(max_length=300)
    item_price = models.CharField(max_length=300)
    item_description = models.TextField()
    dibs_cnt = models.IntegerField()

    def __str__(self):
        return "item [ id = " + str(self.item_id) + ", name = " + self.item_name + ", img = " + self.item_img + ", brand = " + self.item_brand + ", category_large = " + self.category_large + \
            ", categoty_middle = " + self.category_middle + ", category_small = " + self.category_small + ", colors = " + self.item_colors + ", volume = " + self.item_volume + ", price = " + self.item_price + \
                ", description = "+self.item_description+", dibs_cnt = "+str(self.dibs_cnt)
