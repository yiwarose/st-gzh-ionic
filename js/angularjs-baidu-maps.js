'use strict';

var loadBaiduPromise;

var loadBaiduMaps = function ($q, apiKey, version) {

    if (loadBaiduPromise) {
        return loadBaiduPromise;
    }
    var deferred = $q.defer(),
        resolve = function () {
            deferred.resolve(window.BMap ? window.BMap : false);
        },
        callbackName = "loadBaiduMaps_" + ( new Date().getTime() ),
        params = {"ak": apiKey, "v": version};

    if (window.BMap) {
        resolve();
    } else {
        angular.extend(params, {
            'v': version || '2.0', 'callback': callbackName
        });

        window[callbackName] = function () {
            resolve();
            //Delete callback
            setTimeout(function () {
                try {
                    delete window[callbackName];
                } catch (e) {
                }
            }, 20);
        };

        //TODO 后续改进加载效果
        var head = document.getElementsByTagName('HEAD').item(0);
        var bdscript = document.createElement("script");
        bdscript.type = "text/javascript";
        bdscript.src = 'http://api.map.baidu.com/api?v=' + params.v + '&ak=' + params.ak + '&callback=' + params.callback;
        head.appendChild(bdscript);
    }
    loadBaiduPromise = deferred.promise;
    return loadBaiduPromise;
};

function bindMapEvents(scope, eventsStr, baiduObject, element, prefix) {
    prefix = prefix || 'map-';
    angular.forEach(eventsStr.split(' '), function (eventName) {
        baiduObject.addEventListener(eventName, function (event) {
            element.triggerHandler(prefix + eventName, event);
            if (!scope.$$phase) {
                scope.$apply();
            }
        });
    });
}

var lsBaiduMapModule = angular.module('yiwa.bmap', []);

lsBaiduMapModule.value('uiBaiduMapConfig', {})
    .directive('uiBaiduMap', ['uiBaiduMapConfig', '$parse', '$q', function (uiBaiduMapConfig, $parse, $q) {

        var mapEvents = 'click dblclick rightclick rightdblclick maptypechange mousemove ' +
            'mouseover mouseout movestart moving moveend zoomstart ' +
            'zoomend addoverlay addcontrol removecontrol removeoverlay clearoverlays ' +
            'dragstart dragging dragend addtilelayer removetilelayer load resize hotspotclick ' +
            'hotspotover hotspotout tilesloaded touchstart touchmove touchend longpress';
        var options = uiBaiduMapConfig || {};

        return {

            restrict: 'E',

            link: function (scope, elm, attrs) {

                //console.log(scope);

                var opts = angular.extend({}, options, scope.$eval(attrs.mapOptions));

                scope.opts = opts;

                if (!opts.apiKey) {

                    throw new Error('no apiKey was set in options!');
                }

                var onLoadMapSuccess = function () {

                    var enableMapClick = (typeof opts.enableMapClick === 'undefined') ? true : opts.enableMapClick;

                    var map = new window.BMap.Map(elm[0], {enableMapClick: enableMapClick});

                    //map.addControl(new BMap.NavigationControl());    
                    //map.addControl(new BMap.ScaleControl());    
                    //map.addControl(new BMap.OverviewMapControl());    
                    //map.addControl(new BMap.MapTypeControl());  
                    map.enableScrollWheelZoom();

                    map.height= window.innerHeight-40;

                    map.width=window.innerWidth;

                    map.setMapStyle({style:'midnight'});  

                    map.setMapStyle({

                        styleJson:[
                      {
                                "featureType": "road",
                                "elementType": "all",
                                "stylers": {
                                          "visibility": "off"
                                }
                      },
                      {
                                "featureType": "administrative",
                                "elementType": "all",
                                "stylers": {
                                          "visibility": "off"
                                }
                      },
                      {
                                "featureType": "boundary",
                                "elementType": "all",
                                "stylers": {
                                          "visibility": "on"
                                }
                      },
                      {
                                "featureType": "label",
                                "elementType": "all",
                                "stylers": {
                                          "visibility": "off"
                                }
                      },
                      {
                                "featureType": "background",
                                "elementType": "all",
                                "stylers": {
                                          "visibility": "on",

                                }
                      },
                      {
                                "featureType": "building",
                                "elementType": "all",
                                "stylers": {
                                          "visibility": "off"
                                }
                      },
                      {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": {
                                          "visibility": "off"
                                }
                      }
                                ]
                    });

                    map.addSite = function (x,y,name,color,clickCallback) {

                        var point=new BMap.Point(x,y);

                        //var icon = new BMap.Icon('ionic/img/site-'+color+'-20x30.png', new BMap.Size(20, 30), {
                        //                anchor: new BMap.Size(20, 30)
                        //            });
                        var icon = new BMap.Icon('ionic/img/site.png', new BMap.Size(32, 32), {
                                        anchor: new BMap.Size(32, 32)
                                    });

                        var opts = {
                        offset: new BMap.Size(-name.length*10/3, 28) // 设置文本偏移量
                        }

                        var label = new BMap.Label(name,opts);

                        label.setStyle({
                        color : color,
                        //fontSize : "0.5em",
                        backgroundColor:"rgba(0, 0, 0, 0)",
                        border:"0",
                        fontWeight:"bolder"
                        });

                        var marker=new BMap.Marker(point, {
                            icon: icon
                        });

                        marker.setLabel(label);

                        map.addOverlay(marker);

                        if (clickCallback) {

                            marker.addEventListener('click', clickCallback);
                        }

                        var times=0;

                        if(color=="red"){

                            /*setInterval(function(){

                                if(times%2==0){

                                    marker.hide();

                                }else{

                                    marker.show();
                                }

                                times++;

                            },1000);*/
                        }


                    };

                    map.removeAllSites=function(){

                        map.clearOverlays();
                    };

                    if (opts.center) {
                        
                        var point = new BMap.Point(opts.center.longitude, opts.center.latitude); // 创建点坐标

                        map.centerAndZoom(point, opts.zoom || 11);
                    }
                    if (opts.enableScrollWheelZoom) {

                        map.enableScrollWheelZoom();
                    }

                    Object.assign(scope.yiwaMap, map);

                    var events = scope.$eval(attrs.mapEvent);

                    angular.forEach(events, function (uiEvent, eventName) {

                        var fn = $parse(uiEvent);

                        elm.bind(eventName, function (evt) {

                            var params = Array.prototype.slice.call(arguments);

                            params = params.splice(1);

                            fn(scope, {$event: evt, $params: params});

                            if (!scope.$$phase) {

                                scope.$apply();
                            }
                        });
                    });

                    bindMapEvents(scope, mapEvents, map, elm);

                    elm.triggerHandler('map-loaded');
                };
                var onLoadMapFail = function () {
                    //TODO 后续改进，目前加载失败就失败了
                    opts.onMapLoadFild();
                };



                loadBaiduMaps($q, opts.apiKey).then(onLoadMapSuccess, onLoadMapFail);
            }
        };
    }])

    .value('uiBaiduMapInfoWindowConfig', {})

    .directive('uiBaiduMapInfoWindow',
        ['uiBaiduMapInfoWindowConfig', '$parse', '$compile', function (uiBaiduMapInfoWindowConfig, $parse, $compile) {

            var infoWindowEvents = 'clickclose close open maximize restore';
            var options = uiBaiduMapInfoWindowConfig || {};

            return {
                link: function (scope, elm, attrs) {
                    var onLoadMapSuccess = function () {
                        var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
                        var model = $parse(attrs.uiBaiduMapInfoWindow);
                        var infoWindow = model(scope);

                        if (!infoWindow) {
                            infoWindow = new window.BMap.InfoWindow(elm[0], opts);
                            model.assign(scope, infoWindow);

                            var events = scope.$eval(attrs.infoWindowEvent);
                            angular.forEach(events, function (uiEvent, eventName) {
                                var fn = $parse(uiEvent);
                                infoWindow.addEventListener(eventName, function (evt) {
                                    var params = Array.prototype.slice.call(arguments);
                                    params = params.splice(1);
                                    fn(scope, {$event: evt, $params: params});
                                    if (!scope.$$phase) {
                                        scope.$apply();
                                    }
                                });
                            });
                        }

                        elm.replaceWith('<div></div>');
                        infoWindow.open = function open(overlay) {
                            $compile(elm.contents())(scope);
                            overlay.openInfoWindow(infoWindow);
                        };
                    };
                    // 为什么这里使用 先加载百度地图呢？因为测试发现你不先加载，百度地图不一定加载完成，会报错，导致指令无效
                    // TODO 后续改进
                    loadBaiduMaps().then(onLoadMapSuccess);
                }
            };
        }]);
