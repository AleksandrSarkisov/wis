
var iphoneApp = angular.module("iphoneApp", ['ui.router']);

iphoneApp
    .controller('IphoneController', function IphoneController($scope, $http){
        $http.get('js/model.json').
            then(function success(response){
                $scope.iphones = response.data.items;  
            });

        $scope.quantity = 0;
        $scope.sum = 0;
        $scope.basket = [];

        $scope.setBasket = function(name, quantity, price, img){
            var basket = {name: '', quantity: 0, price: 0, img: ''};

            basket.name = name;
            basket.quantity = quantity;
            basket.price = quantity * price;
            basket.img = img;
            
            $scope.basket.push(basket);
        }
        $scope.setQuantitySum = function(quantity, sum){
            $scope.quantity = quantity;
            $scope.sum = sum;
        };
    })

    .controller('MainController', function MainController($scope) {
        $scope.image;
        $scope.name;
        $scope.price;

        $scope.selectName;
        $scope.selectQuantity = 0;
        $scope.selectPrice;
        $scope.selectImage;

        $scope.select = function (iphones) {
            $scope.selectImage = iphones.img;
            $scope.selectName = iphones.name;
            $scope.selectPrice = iphones.price;
        };

        $scope.sumMain = 0;
        $scope.quantityMain = 0;
        
        $scope.add = function(){
            if($scope.selectQuantity != 0)
            {
                $scope.sumMain = $scope.sumMain + $scope.selectQuantity * $scope.selectPrice;
                $scope.quantityMain = $scope.quantityMain + $scope.selectQuantity;

                $scope.setQuantitySum($scope.quantityMain, $scope.sumMain);
                $scope.setBasket($scope.selectName, $scope.selectQuantity, $scope.selectPrice, $scope.selectImage);
                
                $scope.selectQuantity = 0;
                $scope.selectPrice = 0;
            }
        }
    })
    
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/main');
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'main.html',
                controller: 'MainController'
            })
            .state('basket', {
                url: '/basket',
                templateUrl: 'basket.html'
            });
    });