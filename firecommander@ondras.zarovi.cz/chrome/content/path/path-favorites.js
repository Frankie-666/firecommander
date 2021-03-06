Path.Favorites = function(fc) {
	Path.call(this);

	this._columns[Panel.TS] = false;
	this._columns[Panel.ATTR] = false;
}

Path.Favorites.prototype = Object.create(Path.prototype);

Path.Favorites.fromString = function(path, fc) {
	return new this(fc);
}

Path.Favorites.prototype.getPath = function() {
	return "fav://";
}

Path.Favorites.prototype.getName = function() {
	return $("cmd_favorites").getAttribute("label");
}

Path.Favorites.prototype.getItems = function() {
	var result = [];
	
	for (var i=1;i<=10;i++) {
		var ch = i%10;
		var pref = "fav."+ch;
		var path = FC.getPreference(pref);
		if (path) { result.push(new Path.Favorites.Favorite(path, ch)); }
	}

	return result;
}

Path.Favorites.prototype.exists = function() {
	return true;
}

Path.Favorites.prototype.supports = function(feature) {
	if (feature == FC.CHILDREN) { return true; }
	return false;
}

FC.addProtocolHandler("fav", Path.Favorites.fromString.bind(Path.Favorites));

/***/

/**
 * @param {string} path
 * @param {int} index
 */
Path.Favorites.Favorite = function(path, index) {
	Path.call(this);

	this._path = path;
	this._index = index;
}

Path.Favorites.Favorite.prototype = Object.create(Path.prototype);

Path.Favorites.Favorite.prototype.getSort = function() {
	return 1;
}

Path.Favorites.Favorite.prototype.getImage = function() {
	return "chrome://firecommander/skin/favorite.png";
}

Path.Favorites.Favorite.prototype.activate = function(panel, fc) { 
	panel.setPath(this._path);
}

Path.Favorites.Favorite.prototype.getPath = function() {
	return this._path;
}

Path.Favorites.Favorite.prototype.getName = function() {
	return this._path;
}

Path.Favorites.Favorite.prototype.getSize = function() {
	return this._index;
}

Path.Favorites.Favorite.prototype.supports = function(feature) {
	if (feature == FC.DELETE) { return true; }
	return false;
}

Path.Favorites.Favorite.prototype.delete = function() {
	var pref = "fav."+this._index;
	var path = FC.setPreference(pref, "");
}
