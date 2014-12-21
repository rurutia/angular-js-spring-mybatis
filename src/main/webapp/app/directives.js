'use strict';

/* Directives */


angular.module('kumoNoteApp.directives', [])
.controller("defaultCtrl1", function ($scope) {
	$scope.products = [{ name: "Apples", price: 1.20, quantity: 2 },
	                   { name: "Bananas", price: 2.42, quantity: 3 },
	                   { name: "Pears", price: 2.02, quantity: 1 }];
})
.directive("productItem", function () {
	return {
		template: document.querySelector("#productTemplate").outerText,
		require: "^productTable",
		link: function (scope, element, attrs, ctrl) {
			scope.$watch("item.quantity", function () {
				ctrl.updateTotal();
			});
		}
	}
})
.directive("productTable", function () {
	return {
		transclude: true,
//		template: '<div abc="Abc">aaaaaaaaaaaaaaa</div>',
		scope: { value: "=productTable", data: "=productData" },
		controller: function ($scope, $element, $attrs) {
			this.updateTotal = function() {
				var total = 0;
				for (var i = 0; i < $scope.data.length; i++) {
					total += Number($scope.data[i].quantity);
				}
				$scope.value = total;
			}
		}
	}
})
  .directive('transtest', function() {
	  return {
		  restrict: 'AE',
		  scope: {
			  prop: "@"
		  },
		  transclude: true,
		  template: "<div><h3>prop is: {{prop}}</h3></div>",
		  link: function(scope, elm, attrs) {
			  scope.var1 = "in scope var";
		  }
	  }
  })
  .directive('appInfo', function() {
    return function(scope, elm, attrs) {
    	elm
    	  .prepend($('<h5></h5>').html(scope.appInfo.getJSVersions()))
    	  .prepend($('<h5></h5>').html(scope.appInfo.getStartTime()));		  
    };  
  })
  .directive('toolbarHover', function($state) {
	  return {
		  restrict: 'A',
		  scope: {
			  note: "=",
			  deleteNote: "&"
		  },
		  link: function(scope, elm, attrs) {
			  var toolbar = angular.element('<div class="btnContainer"></div>');
			  var toolbarView = 
				  angular
				  .element('<div><span class="glyphicon glyphicon-eye-open" title="View"></span></div>')
				  .click(function() {
					  $state.go('detail', {noteId: scope.note.id});
				  });
			  var toolbarDelete = 
				  angular
				  .element('<div><span class="glyphicon glyphicon-remove-circle" title="Delete"></span></div>')
				  .click(function() {
					  if(confirm('This record will be deleted if clicking yes')) {
						  scope.deleteNote({theNote: scope.note});
					  }
				  });
			  var toolbarMark = 
				  angular
				  .element('<div><span class="glyphicon glyphicon-pushpin" title="Mark"></span></div>')
				  .click(function() {
					  scope.note.isMarked = !scope.note.isMarked;
					  angular.element(this).toggleClass('marked');
				  });
			  toolbar.append(toolbarView).append(toolbarDelete).append(toolbarMark).hide();

			  scope.$watch('note.isMarked', function(newValue, oldValue) {
					if(newValue) {
						toolbarMark.addClass('marked');
					}
					else {
						toolbarMark.removeClass('marked');
					}
				});  
			  
			  elm.find('td').last().css('position', 'relative').append(toolbar);
			  elm.mouseover(function() {
				  toolbar.show();
			  });
			  
			  elm.mouseout(function() {
				  toolbar.hide();  
			  });
			  
		  }
	  }
  })
  .directive('syntaxHighlight', function($timeout, LANGUAGE) {
	  return {
		  restrict: 'A',
		  template: '<div><pre class="pre-scrollable-x-y"><code class="language-{{type}}">{{content}}</code></pre></div>',
		  scope: {
			  content: "@",
			  languageType: "@"
		  },
		  link: function(scope, elm, attrs) {
			  angular.forEach(LANGUAGE, function(value, key) {
				  if(scope.languageType.toLowerCase().indexOf(value) > -1) {
					  scope.type = value;
				  }
			  });			  
			  
			  $timeout(function () {
				  //DOM has finished rendering
				  Prism.highlightElement(elm.find("code")[0]);
			  });

		  }
	  }
  })
  .directive('highlight', function() {
	  return {
		  restrict: 'A',
		  template: '<h3><input ng-model="obj.title"></h3><h3><input ng-model="local"></h3>',
		  replace: false,
		  scope: {
			  local: "=prop"
		  },
		  link: function(scope, elm, attrs) {
//			  elm.css('color', attrs['highlight']);
//			  scope.obj = {title: "obj test from directive"};
//			  scope.reverseName = function(){
//			        scope.obj['title'] = scope.obj['title'].split('').reverse().join('');
//			    };
//			    scope.reverseName = function(){
//			        scope.title = scope.title.split('').reverse().join('');
//			    };
		  }
	  }
  })
  .directive("panel", function () {
	  return {
		  link: function (scope, element, attrs) {
			  scope.dataSource = "directive";
		  },
		  restrict: "E",
		  scope: true,
		  template: function () {
			  return angular.element(
					  document.querySelector("#template")).html();
		  },
		  transclude: true
	  }
  })
  ;
  
 
