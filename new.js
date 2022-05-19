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

		for (var i = 0; i < entries.length-1; i++) { // entries.length-1 to strip the blank entry after the last newline
			var items = entries[i].split("\t");
			objectStore.add({ id: i, graph: xlit2graph(items[0]), xlit: items[0], phone: items[1] });
		}
	}
}

function lookup_by_graph (graph) { // async request for appending lemma by lemma
	console.log("lookup_by_graph", graph);
	try {
		var tx = db.transaction(["mon_verb"], "readonly");
	} catch(err) {console.error(err)}
	var req_query = tx.objectStore("mon_verb").index("by_graph").openCursor(IDBKeyRange.only(graph));

	req_query.onsuccess = function() {
		var cursor = req_query.result;
		if (cursor) {
			// Called for each matching record.
			document.getElementById("lemmas").innerHTML += cursor.value.graph + ' '
				+ "<span class='IPA'>(" + "<a  target='_blank' rel='noopener noreferrer' href='"
				+ "http://hkuri.cneas.tohoku.ac.jp/p01/mongol/list?groupId=12&keyword="
				+ xlit2unicode(cursor.value.xlit) + "'>" + "<span class='xlit'>"
				+ cursor.value.xlit + "</span></a>" + ' /'
				+ cursor.value.phone + "/)</span>" + '<br>';
			cursor.continue();
		}
	};

}
