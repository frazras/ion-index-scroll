angular.module('ion-alpha-scroll', [])
.directive('ionAlphaScroll', [
	'$ionicScrollDelegate', '$location', '$timeout',
	function ($ionicScrollDelegate, $location, $timeout){
		return{
			require: '?ngModel',
			restrict: 'AEC',
			replace: true,
			compile: function(tElement, tAttrs, tTransclude){
				var children = tElement.contents();
				var template = angular.element([
					'<ion-list class="ion_alpha_list_outer">',
						'<ion-scroll delegate-handle="alphaScroll">',
							'<div data-ng-repeat="(letter, items) in sorted_items" class="ion_alpha_list">',
								'<ion-item class="item item-divider" id="index_{{letter}}">{{letter}}</ion-item>',
								'<ion-item ng-repeat="item in items"></ion-item>',
							'</div>',
						'</ion-scroll>',
						'<ul class="ion_alpha_sidebar has-header has-subheader">',
							'<li ng-click="alphaScrollGoToList(\'index_{{letter}}\')" ng-repeat="letter in alphabet">{{$index%2 == 0 ? letter: "&bull;"}}</li>',
						'</ul>',
					'</ion-list>'
					].join(''));

				angular.element(template.find('ion-item')[1]).append(children);
				tElement.html('');
      			tElement.append(template);
				
      			tElement.find('ion-scroll').css({"height": window.innerHeight + 'px'})

				return function (scope, element, attrs, ngModel) {
					var count = 0;
					var scrollContainer = element.find('ion-scroll');

					var ionicScroll = scrollContainer.controller('$ionicScroll');

	                // do nothing if the model is not set
	                if (!ngModel) return;

	                ngModel.$render = function(){
	                	console.log(ngModel.$viewValue);
						scope.items = [];                	
	                	scope.items = ngModel.$viewValue;
	                	scope.alphabet = iterateAlphabet();
		                var tmp={};
			            for(i=0;i<scope.items.length;i++){
			              var letter=scope.items[i][attrs.key].toUpperCase().charAt(0);
			              if( tmp[ letter] ==undefined){
			              tmp[ letter]=[]
			            }
			              tmp[ letter].push( scope.items[i] );
			            }
			            scope.sorted_items = tmp;

			            scope.alphaScrollGoToList = function(id){
				          $location.hash(id);
				          $ionicScrollDelegate.$getByHandle('alphaScroll').anchorScroll();
				        }

				        //Create alphabet object
				        function iterateAlphabet()
				        {
				           var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
				           var numbers = new Array();
				           for(var i=0; i<str.length; i++)
				           {
				              var nextChar = str.charAt(i);
				              numbers.push(nextChar);
				           }
				           return numbers;
				        }
				        scope.groups = [];
				        for (var i=0; i<10; i++) {
				          scope.groups[i] = {
				            name: i,
				            items: []
				          };
				          for (var j=0; j<3; j++) {
				            scope.groups[i].items.push(i + '-' + j);
				          }
				        }

				        // $timeout(function(){
				        // 	count++;
				        // 	if(count<=1){
					       //  	var height = element[0].getElementsByClassName('list')[0].offsetHeight;
				        //         var viewHeight =document.body.children[0].offsetHeight;
				        //         console.log(height);
				        //         console.log(viewHeight);
			         //     	}
				        // }, 500)

	                };

	            }
	        }
        };
    }]);