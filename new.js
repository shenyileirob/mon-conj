var db;
send_req_dict();
function send_req_dict() {
	var req_dict = new XMLHttpRequest();
	req_dict.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			compile_dict(this);
		}
	};
	req_dict.open("GET", "dict.txt", true);
	req_dict.send();
}
function compile_dict(req_dict) {
	//prefixes of implementation that we want to test
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	//prefixes of window.IDB objects
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	if (!window.indexedDB) {
		window.alert("Your browser doesn't support a stable version of IndexedDB.");
		return;
	}

	try {
		var req_db = window.indexedDB.open("db_dict", 1);
		console.log('777: openning of DB requested') // signalled only when open requested
	} catch(err) {console.error(err)}

	req_db.onerror = function(event) {
		console.log("error: ", req_db.error.name);
	};

	req_db.onsuccess = function(event) {
		console.log("709: req_db.onsuccess");
		db = req_db.result;
		refresh_LB_deconj_lemma();
	};

	req_db.onupgradeneeded = function(event) {
		console.log('710: req_db.onupgradeneeded');
		db = event.target.result;
		var entries = req_dict.response.split(/[\r\n]+/); // req_dict.response is the text of the dict file
		
		var objectStore = db.createObjectStore("mon_verb", {keyPath: "id", autoIncrement: true});
		var titleIndex = objectStore.createIndex("by_graph", "graph", {unique: false});
		var titleIndex = objectStore.createIndex("by_graph_ax", "graph_ax", {unique: false});

		for (var i = 0; i < entries.length-1; i++) { // entries.length-1 to strip the blank entry after the last newline
			var items = entries[i].split("\t");
			objectStore.add({ id: i, graph: xlit2graph(items[0]), graph_ax: confuse_ax(xlit2graph(items[0])), xlit: items[0], phone: items[1] });
		}
	}
}
function confuse_ax(s, if_suffix=0) {
	if(if_suffix) return s.replace(/ᡍ(?=[^ᡃ])/g, "ᡄᡄ");
	else return s.slice(0, 1)+s.slice(1).replace(/ᡍ(?=[^ᡃ])/g, "ᡄᡄ");
}
function hlink(innerHTML, href) {
	return "<a target='_blank' rel='noopener noreferrer' href='" + href + "'>" + innerHTML + "</a>"
}
function lookup_by_graph (graph, if_confuse_teeth=0) { // async request for appending lemma by lemma
	try {
		var tx = db.transaction(["mon_verb"], "readonly");
	} catch(err) {console.error(err)}
	var index_name = if_confuse_teeth ? "by_graph_ax" : "by_graph";
	graph = if_confuse_teeth ? confuse_ax(graph) : graph;
	console.log("lookup_by_graph", if_confuse_teeth, graph);
	var req_query = tx.objectStore("mon_verb").index(index_name).openCursor(IDBKeyRange.only(graph));

	console.log("index_name", index_name, "graph", graph);
	req_query.onsuccess = function() {
		var cursor = req_query.result;
		if (cursor) {
			// Called for each matching record.
			document.getElementById("lemmas").innerHTML += cursor.value.graph + " <span class='IPA'>("
				+ "<span class='xlit'>"+cursor.value.xlit+"</span>"
				+ (!cursor.value.phone ? '' : ' /'+hlink(cursor.value.phone,
					"http://hkuri.cneas.tohoku.ac.jp/p01/mongol/list?groupId=12&keyword="+xlit2unicode(cursor.value.xlit) )+"/")
				+ (!cursor.value.cyr ? '' : ' '+hlink(cursor.value.cyr,
					"https://mongoltoli.mn/search.php?opt=2&word="+xlit2unicode(cursor.value.xlit) ))
				+ ")</span><br>";
			cursor.continue();
			console.log("id", cursor.value.id);
		}
	};

}
