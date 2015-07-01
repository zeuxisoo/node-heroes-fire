var request = require('request'),
    cheerio = require('cheerio');

app.controller('HomeController', ['app', '$scope', '$q', function(app, $scope, $q) {
    var getHeroes = function() {
        var deferred = $q.defer();

        request(app.apiUrl, function(error, response, body) {
            var $ = cheerio.load(body);
            var heroes = [];
            var free   = [];
            var other  = [];

            $("div.hero").each(function(i, hero) {
                var image = $(hero).find('.icon-wrap .icon img');
                var link  = $(hero).find('.link-wrap a');

                if ($(hero).hasClass('free')) {
                    free.push({
                        'name' : link.attr('href').split('/').pop(),
                        'image': app.apiUrl + image.attr('src')
                    });
                }else{
                    other.push({
                        'name' : link.attr('href').split('/').pop(),
                        'image': app.apiUrl + image.attr('src')
                    });
                }
            });

            heroes = {
                'free' : free,
                'other': other
            }

            deferred.resolve(heroes);
        });

        return deferred.promise;
    };

    getHeroes().then(function(heroes) {
        $scope.heroes = heroes;
    });
}]);

app.controller('HeroController', ['app', '$scope', '$routeParams', '$q', function(app, $scope, $routeParams, $q) {
    var getGuides = function() {
        var deferred = $q.defer(),
            name     = $routeParams.name,
            guideUrl = app.apiUrl + '/hots/wiki/heroes/' + name;

        request(guideUrl, function(error, response, body) {
            var $ = cheerio.load(body);
            var guides = [];

            $("#browse-guides .browse-item-list a").each(function(i, item) {
                var image   = app.apiUrl +  $(item).find('.pic img').attr('src');
                var subject = $(item).find('.desc h4').text();
                var update  = $(item).find('.desc .created').text().replace(/\s+/g, ' ').trim().split(' ').slice(1, 5).join(' ');
                var status  = $(item).find('.votes').text().replace(/\s+/g, ' ').trim().split(' ');
                var rank    = $(item).find('.guide-votes .rank').text();

                var link    = $(item).attr('href').split('/').pop();

                guides.push({
                    'image'  : image,
                    'subject': subject,
                    'update' : update,
                    'status' : status,
                    'rank'   : rank,
                    'link'   : link
                });
            });

            deferred.resolve(guides);
        });

        return deferred.promise;
    }

    getGuides().then(function(guides) {
        $scope.guides = guides;
        $scope.name   = $routeParams.name;

        app.dataService.setValue('heroName', $routeParams.name);
    });
}]);

app.controller('GuideController', ['app', '$scope', '$q', '$routeParams', function(app, $scope, $q, $routeParams) {
    var getGuide = function() {
        var deferred = $q.defer(),
            namePath = $routeParams.namePath,
            guideUrl = app.apiUrl + '/hots/guide/' + namePath;

        request(guideUrl, function(error, response, body) {
            var $ = cheerio.load(body);

            var header = $(".guide-header .desc h2").text();
            var name   = app.dataService.getValue('heroName');
            var skills = [];
            var points = [];

            $(".guide-rotator .title .skills").first().find(".skill .level .pic img").each(function(i, skill) {
                skills.push({
                    'image': app.apiUrl + $(skill).attr('src')
                });
            });

            $(".guide-rotator .title .skills").first().find(".skill .points").each(function(i, point) {
                $('div', point).each(function(no, div) {
                    if ($(div).hasClass('selected')) {
                        points.push({
                            'no': no + 1
                        });
                    }
                });
            });

            var guide  = {
                'header': header,
                'name'  : name,
                'skills': skills,
                'points': points
            }

            deferred.resolve(guide);
        });

        return deferred.promise;
    }

    getGuide().then(function(guide) {
        $scope.guide = guide;
    });
}]);
