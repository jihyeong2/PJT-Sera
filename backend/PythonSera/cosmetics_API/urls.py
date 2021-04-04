from django.urls import path
from cosmetics_API import views

urlpatterns = [
    path('', views.itemList),
    path('<int:item_id>', views.item_one),
    path('recom/<int:user_id>', views.itemListRecom),
    path('recom/<int:user_id>/<str:category_large>', views.itemListRecom),
    path('recom/<int:user_id>/<str:category_large>/<str:category_middle>', views.itemListRecom),
    path('correct/<int:user_id>', views.itemListCorrect),
    path('correct/<int:user_id>/<str:category_large>', views.itemListCorrect),
    path('sort/score/<int:user_id>', views.itemSortScore),
    path('sort/score/<int:user_id>/<str:category_large>', views.itemSortScore),
    path('sort/score/<int:user_id>/<str:category_large>/<str:category_middle>', views.itemSortScore),
    path('sort/reviewCnt/<int:user_id>', views.itemSortReviewCnt),
    path('sort/reviewCnt/<int:user_id>/<str:category_large>', views.itemSortReviewCnt),
    path('sort/reviewCnt/<int:user_id>/<str:category_large>/<str:category_middle>', views.itemSortReviewCnt),
    path('sort/price/<int:user_id>/<int:sort_type>', views.itemSortPrice),
    path('sort/price/<int:user_id>/<str:category_large>/<int:sort_type>', views.itemSortPrice),
    path('sort/price/<int:user_id>/<str:category_large>/<str:category_middle>/<int:sort_type>', views.itemSortPrice),
    
]
