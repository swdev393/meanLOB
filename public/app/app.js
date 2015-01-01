/**
 * Created by Deb on 8/20/2014.
 */
(function () {
    "use strict";
    var app = angular.module("productManagement",
        ["common.services",
            "ui.router",
            "ui.mask",
            "ui.bootstrap",
            "angularCharts"]);

    //,"productResourceMock"

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
            ["$delegate",
                function ($delegate) {
                    return function (exception, cause) {
                        exception.message = "Please contact the Help Desk! \n Message: " +
                                                                exception.message;
                        $delegate(exception, cause);
                        alert(exception.message);
                    };
                }]);
    });

    app.config(["$stateProvider",
            "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state("home", {
                        url: "/",
                        templateUrl: "app/welcomeView.html"
                    })
                    // Products
                    .state("productList", {
                        url: "/products",
                        templateUrl: "app/products/productListView.html",
                        controller: "ProductListCtrl as vm"
                    })
                    .state("productEdit", {
                        abstract: true,
                        url: "/products/edit/:productId",
                        templateUrl: "app/products/productEditView.html",
                        controller: "ProductEditCtrl as vm",
                        resolve: {
                            productResource: "productResource",

                            product: function (productResource, $stateParams) {
                                var productId = $stateParams.productId;
                                return productResource.get({ productId: productId }).$promise;
                            }
                        }
                    })
                    .state("productEdit.info", {
                        url: "/info",
                        templateUrl: "app/products/productEditInfoView.html"
                    })
                    .state("productEdit.price", {
                        url: "/price",
                        templateUrl: "app/products/productEditPriceView.html"
                    })
                    .state("productEdit.tags", {
                        url: "/tags",
                        templateUrl: "app/products/productEditTagsView.html"
                    })
                    .state("productDetail", {
                        url: "/products/:productId",
                        templateUrl: "app/products/productDetailView.html",
                        controller: "ProductDetailCtrl as vm",
                        resolve: {
                            productResource: "productResource",

                            product: function (productResource, $stateParams) {
                                var productId = $stateParams.productId;
                                return productResource.get({ productId: productId }).$promise;
                            }
                        }
                    })
                    .state("priceAnalytics", {
                        url: "/priceAnalytics",
                        templateUrl:"app/prices/priceAnalyticsView.html",
                        controller: "PriceAnalyticsCtrl",
                        resolve: {
                            productResource: "productResource",

                            products: function (productResource) {
                                return productResource.query(function(response) {
                                        // no code needed for success
                                    },
                                    function(response) {
                                        if (response.status == 404) {
                                            alert("Error accessing resource: " +
                                                response.config.method + " " +response.config.url);
                                        } else {
                                            alert(response.statusText);
                                        }
                                    }).$promise;

                            }
                        }
                    })
            }]
    );
}());