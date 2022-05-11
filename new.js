var db;
var xhrmode = 1;
loadDoc();
function loadDoc() {
	if(xhrmode){
		console.log('111');
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log('444');
				compile_dict(this);
			}
		};
		console.log('222');
		xhttp.open("GET", "dict.txt", true);
		xhttp.send();
		console.log('333');
	}
	else{
		compile_dict(null);
	}
}
function compile_dict(xhttp) {
	console.log('555');
	var i;

	if(xhrmode)
	{
		var text_dict = xhttp.response;
	}
	else
	{
		var text_dict = 'aibaixu	æːbɪːx\r\naibalǰaxu	æːbɑ̆lʤɪx\r\naiburlaxu	æːbɑ̆rlɑ̆x\r\naixu	æːx\r\naigudxaxu	æːɡʊːtɡɑ̆x\r\naimaxu	æːmɑ̆x\r\naimaglaxu	æːmɑ̆ɡlɑ̆x\r\naimagčilaxu	æːmɑ̆ɡʧlɑ̆x\r\naimasxu	æːmsɑ̆x\r\naimurxu	æːmrɑ̆x\r\naimurlaxu	æːmɑ̆rlɑ̆x\r\nailadxaxu	æːltɡɑ̆x\r\nailadxu	æːldɑ̆x\r\nailuglaxu	æːlɑ̆ɡlɑ̆x\r\nailgaxu	æːlɡɑ̆x\r\nailsaxu	æːlsɑ̆x\r\nailsixu	æːlʃɪx\r\nailčilaxu	æːlʧlɑ̆x\r\naisuxu	æːsɑ̆x\r\naidaŋguilaxu	æːdɑ̆ŋɡʊɪlɑ̆x';
	}
	var entries = text_dict.split(/[\r\n]+/);
	/*
	console.log(text_dict);
	console.log(entries);
	*/
	/*
	var innerHTML = '';
	console.log(entries[1]);
	for (i = 0; i < entries.length; i++) {
		innerHTML += "<span>" + entries[i] + "</span><br>";
	}
	console.log('666');
	document.getElementById("lemmas").innerHTML = innerHTML;
	console.log('777');
	*/
	
	//prefixes of implementation that we want to test
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

	//prefixes of window.IDB objects
	window.IDBTransaction = window.IDBTransaction || 
	window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

	if (!window.indexedDB) {
		window.alert("Your browser doesn't support a stable version of IndexedDB.")
	}


	//var db;
	//	console.log(window.indexedDB);
	console.log('701');
	try {
		var request = window.indexedDB.deleteDatabase("newDatabase");
	}
	catch(err) {
	}

	var request = window.indexedDB.open("newDatabase", 1);

	request.onerror = function(event) {
		console.log("error: ", request.error.name);
	};

	request.onsuccess = function(event) {
		db = request.result;
		console.log("success: 709"+ db);
	};

	request.onupgradeneeded = function(event) {
		console.log('710');
		db = event.target.result;
		console.log('711');
		var objectStore = db.createObjectStore("lexeme", {keyPath: "id", autoIncrement: true});
		console.log(objectStore);
		var titleIndex = objectStore.createIndex("by_graph", "graph", {unique: false});
		console.log('712');

		for (i = 0; i < entries.length; i++) {
			var items = entries[i].split("\t");
			objectStore.add({ id: i, graph: xlit2graph(items[0]), xlit: items[0], phone: items[1] });
			//console.log(i, xlit2graph(items[0]), items[0], items[1])
		}
		console.log(db);

	// lookup_by_graph ('ᡄᡄᡅᡅᡏᡄᡍᠴᡅᠯᡄᡍᡇ')
		console.log('714');
	}
}

function lookup_by_graph (graph) {
	console.log(db);
	console.log(graph);
	//console.log(objectStore);
	try {
		var tx = db.transaction(["lexeme"], "readonly");
	} catch(err) {}
	console.log(tx);
	var store = tx.objectStore("lexeme");
	var index = store.index("by_graph");

	var request = index.openCursor(IDBKeyRange.only(graph));
	console.log('715');
	innerHTML = '';
	request.onsuccess = function() {
		var cursor = request.result;
		if (cursor) {
			// Called for each matching record.
			innerHTML += cursor.value.graph + ' '
				+ "<span class='IPA'>(" + "<span class='xlit'>" + cursor.value.xlit + "</span>" + ' /'
				+ cursor.value.phone + "/)</span>" + '<br>';
			cursor.continue();
		} else { }
		console.log('716:', innerHTML);
		document.getElementById("lemmas").innerHTML = innerHTML;
		//return innerHTML;
	};

}
