// 实例化一个模块用来专门管理所有的控制器
angular.module('controllers', [])

    .controller('demoController', ['$scope', function ($scope) {
        console.log('on');
    }]);