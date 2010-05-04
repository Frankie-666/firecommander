var Options = {
	_pick: function(e) {
		var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
		fp.init(window, "FIXME", fp.modeOpen);
		var result = fp.show();
		if (result != fp.returnOK) { return; }
		
		var file = fp.file;
		$("pref_editor").value = file.path;
	},
	init: function(e) {
		$("button_editor").addEventListener("command", Options._pick, false);
	}
}

window.addEventListener("load", Options.init, false);