/* -- Adobe GoLive JavaScript Library */

var preloadFlag = false;

function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

function changeImages() {
	changeImagesArray(changeImages.arguments);
}
function initImgID() { var di = document.images; if (mustInitImg && di) { for (var i = 0; i < di.length; i++) { if (!di[i].id) di[i].id = di[i].name; } mustInitImg = false; } }
function findElement(n, ly) {
	var d = document;
	if (browserVers < 4) return d[n];
	if ((browserVers >= 6) && (d.getElementById)) { initImgID; return (d.getElementById(n)) };
	var cd = ly ? ly.document : d;
	var elem = cd[n];
	if (!elem) {
		for (var i = 0; i < cd.layers.length; i++) {
			elem = findElement(n, cd.layers[i]);
			if (elem) return elem;
		}
	}
	return elem;
}
function changeImagesArray(array) {
	if (preloadFlag == true) {
		var d = document; var img;
		for (i = 0; i < array.length; i += 2) {
			img = null; var n = array[i];
			if (d.images) {
				if (d.layers) { img = findElement(n, 0); }
				else { img = d.images[n]; }
			}
			if (!img && d.getElementById) { img = d.getElementById(n); }
			if (!img && d.getElementsByName) {
				var elms = d.getElementsByName(n);
				if (elms) {
					for (j = 0; j < elms.length; j++) {
						if (elms[j].src) { img = elms[j]; break; }
					}
				}
			}
			if (img) { img.src = array[i + 1]; }
		}
	}
}

function MM_swapImgRestore() { //v3.0
	var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
}

function MM_findObj(n, d) { //v4.01
	var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
		d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
	}
	if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
	for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
	if (!x && d.getElementById) x = d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
	var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2); i += 3)
		if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
}