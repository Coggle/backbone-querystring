var _ = require('underscore');
var qs = require('qs');

module.exports = function(Backbone) {

    Backbone.Model.prototype.setQuerystring =
    Backbone.Collection.prototype.setQuerystring = function(query) {
        this._backbone_querystring_plugin = query;
        return this;
    };

    Backbone.Model.prototype.getQuerystring =
    Backbone.Collection.prototype.getQuerystring = function() {
        return _.clone(this._backbone_querystring_plugin);
    };

    function applyQuerystring(url, query) {
        if (query && Object.keys(query).length){
            var asString = qs.stringify(query);
            if (url.indexOf('?') === -1) {
                url += '?'+asString;
            } else {
                url += '&'+asString;
            }
        }
        return url;
    }

    Backbone.Collection.prototype.url = function() {
        return applyQuerystring(_.result(this, 'urlRoot'), this.getQuerystring());   
    };

    var _url = Backbone.Model.prototype.url;
    Backbone.Model.prototype.url = function() {
        return applyQuerystring(_url.apply(this, arguments), this.getQuerystring());
    };
};
