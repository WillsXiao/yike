var app = angular.module('app', ['ngRoute', 'controllers']);

// 路由
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/today', {
            templateUrl: './views/today.html',
            controller: 'todayController'
        })
        .when('/older',{
            templateUrl: './views/older.html',
            controller: 'olderController'
        })
        .when('/author',{
            templateUrl: './views/author.html',
            controller: 'authorController'
        })
        .when('/category',{
            templateUrl: './views/category.html',
            controller: 'categoryController'
        })
        .when('/favourite',{
            templateUrl: './views/favourite.html',
            controller: 'favouriteController'
        })
        .when('/settings',{
            templateUrl: './views/settings.html',
            controller: 'settingsController'
        })
        .otherwise({
            redirectTo: '/today'
        });
}]);

// 初始化
app.run(['$rootScope', function ($rootScope) {
    // 设置类名初始化
    $rootScope.collapsed = false;
    // 全局方法
    $rootScope.toggle = function () {
        // 改变类名初始值 true | false
        $rootScope.collapsed = !$rootScope.collapsed;

        // 获取所有导航
        var navs = document.querySelectorAll('.navs dd');

        if ($rootScope.collapsed) {// 侧边栏打开
            for (var i = 0; i < navs.length; i++) {
                // 动画
                navs[i].style.transform = 'translate(0)';
                // 动画开始前等待的时间
                navs[i].style.transitionDelay = '0.2s';
                // 动画完成所需要的时间
                navs[i].style.transitionDuration = (i + 1) * 0.15 + 's';
            }
        } else {// 侧边样关闭
            var len = navs.length - 1;
            for (var j = len; j > 0; j--) {
                console.log(navs.length - j + 1);
                navs[j].style.transform = 'translate(-100%)';
                navs[j].style.transitionDelay = '';
                navs[j].style.transitionDuration = (len - j) * 0.15 + 's';
            }
        }
    }
}]);
