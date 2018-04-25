// 实例化一个模块用来专门管理所有的控制器
angular.module('controllers', [])

    .controller('demoController', ['$scope', function ($scope) {
        console.log('on');
    }])

    // 侧边导航
    .controller('navController', ['$scope', function ($scope) {
        $scope.navs = [
            {text: '今日一刻', link: '#/today"', icon: 'icon-home'},
            {text: '往期内容', link: '#/older', icon: 'icon-file-empty'}
        ]
    }])

    // 今日一刻
    .controller('todayController', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');
        $rootScope.title = '今日一刻';
        $rootScope.loaded = false;
        $http({
            url: './api/today.php',
            method: 'GET',
            params: {
                today: today
            }
        }).then(function (value) {
            console.log(value.data.posts);
            $scope.posts = value.data.posts;
            $scope.date = value.data.date;
            $rootScope.loaded = true;
        })
    }])

    // 往期内容
    .controller('olderController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
        $rootScope.title = '往期内容';
        $rootScope.loaded = false;
        $http({
            url: './api/older.php',
            method: 'GET'
        }).then(function (value) {
            console.log(value.data);
            $scope.posts = value.data.posts;
            $scope.date = value.data.date;
            $rootScope.loaded = true;
        })
    }])
