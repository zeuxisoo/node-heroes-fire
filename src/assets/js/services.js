app.factory('dataService', function() {
    var dict = {};

    return {
        setValue: function(key, value) {
            dict[key] = value;
        },
        getValue: function(key) {
            return dict[key];
        }
    }
});
