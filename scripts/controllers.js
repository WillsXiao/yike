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
    .controller('todayController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
        var today = $filter('date')(new Date(), 'yyyy-MM-dd');
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
        })
    }])

    // 往期内容
    .controller('olderController', ['$scope', function ($scope) {

    }])
