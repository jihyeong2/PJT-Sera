from django.urls import path
from cosmetics_API import views

urlpatterns = [
    path('items', views.itemList),
    path('items/<int:item_id>', views.item_one),
    path('items/recom/<int:user_id>', views.itemListRecom),
    path('items/recom/<int:user_id>/<str:category_large>', views.itemListRecomCategoryLarge),
    path('items/recom/<int:user_id>/<str:category_large>/<str:category_middle>', views.itemListRecomCategoryMiddle),
    path('items/sort/score/<int:user_id>/<str:category_large>', views.itemSortScoreCategoryLarge),
    path('items/sort/score/<int:user_id>/<str:category_large>/<str:category_middle>', views.itemSortScoreCategoryMiddle),
    path('items/sort/reviewCnt/<int:user_id>/<str:category_large>', views.itemSortReviewCntCategoryLarge),
    path('items/sort/reviewCnt/<int:user_id>/<str:category_large>/<str:category_middle>', views.itemSortReviewCntCategoryMiddle),
    path('items/sort/price/<int:user_id>/<str:category_large>/<int:sort_type>', views.itemSortPriceCategoryLarge),
    path('items/sort/price/<int:user_id>/<str:category_large>/<str:category_middle>/<int:sort_type>', views.itemSortPriceCategoryMiddle),
    
]
