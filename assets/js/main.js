(function() {
  angular.module('tioApp', ['tio.mobile-navi', 'tio.kirby.formsend']);

  angular.module('tioApp').service('eventService', function($rootScope) {
    var set;
    set = false;
    this.checkTrigger = function(position) {
      if (set && position === 0) {
        $rootScope.$broadcast('tioApp::scrollIsTop');
        set = false;
      } else if (!set && position !== 0) {
        $rootScope.$broadcast('tioApp::scrollIsntTop');
        set = true;
      }
    };
  });

  angular.module('tioApp').directive('mainNavInverted', function($window, $document, eventService) {
    return {
      restrict: 'C',
      link: function(scope, elm, attrs, ctrls) {
        var updatePosition;
        updatePosition = function() {
          return eventService.checkTrigger($window.pageYOffset);
        };
        $document.bind('scroll', updatePosition);
      },
      controller: function($scope, $element) {
        var removeInverted, setInverted;
        setInverted = function() {
          return $element.addClass('main-nav--inverted');
        };
        removeInverted = function() {
          return $element.removeClass('main-nav--inverted');
        };
        $scope.$on('tioApp::scrollIsTop', setInverted);
        $scope.$on('tioApp::scrollIsntTop', removeInverted);
      }
    };
  });

}).call(this);
