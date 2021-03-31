from django.contrib import admin
from cosmetics_API.models import Item
# Register your models here.
class ItemAdmin(admin.ModelAdmin):
    list_display = (
        'item_id',
        'item_name',
        'item_img',
        'item_brand',
        'category_large',
        'category_middle',
        'category_small',
        'item_colors',
        'item_volume',
        'item_price',
        'item_description',
        'dibs_cnt',
    )
admin.site.register(Item, ItemAdmin)