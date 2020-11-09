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
else{compile_dict(null);}
}
function compile_dict(xhttp) {
	console.log('555');
  var i;
  
  if(xhrmode){
  var text_dict = xhttp.response;
  }else{
	  //var text_dict = 'aaa	1	2\r\nbbb	3	4\r\nbbb	5	6\r\nccc	7	8';
	  var text_dict = 'a	ʔaibai×+	æːbɪːx\r\nb	ʔaibalǰa×+	æːbɑ̆lʤɪx\r\nc	ʔaiburla×+	æːbɑ̆rlɑ̆x\r\nd	ʔai×+	æːx\r\ne	ʔaigudxa×+	æːɡʊːtɡɑ̆x\r\nf	ʔaima×+	æːmɑ̆x\r\ng	ʔaimagla×+	æːmɑ̆ɡlɑ̆x\r\na	ʔaimagčila×+	æːmɑ̆ɡʧlɑ̆x\r\nb	ʔaimas×+	æːmsɑ̆x\r\nc	ʔaimur×+	æːmrɑ̆x\r\nd	ʔaimurla×+	æːmɑ̆rlɑ̆x\r\ne	ʔailadxa×+	æːltɡɑ̆x\r\nf	ʔailad×+	æːldɑ̆x\r\ng	ʔailugla×+	æːlɑ̆ɡlɑ̆x\r\na	ʔailga×+	æːlɡɑ̆x\r\nb	ʔailsa×+	æːlsɑ̆x\r\nc	ʔailsi×+	æːlʃɪx\r\nd	ʔailčila×+	æːlʧlɑ̆x\r\ne	ʔaisu×+	æːsɑ̆x\r\nf	ʔaidaŋguila×+	æːdɑ̆ŋɡʊɪlɑ̆x';
	  var text_dict = 'ʔaibai×+	ʔaibai×+	æːbɪːx\r\nʔaibalǰa×+	ʔaibalǰa×+	æːbɑ̆lʤɪx\r\nʔaiburla×+	ʔaiburla×+	æːbɑ̆rlɑ̆x\r\nʔai×+	ʔai×+	æːx\r\nʔaigudxa×+	ʔaigudxa×+	æːɡʊːtɡɑ̆x\r\nʔaima×+	ʔaima×+	æːmɑ̆x\r\nʔaimagla×+	ʔaimagla×+	æːmɑ̆ɡlɑ̆x\r\nʔaimagčila×+	ʔaimagčila×+	æːmɑ̆ɡʧlɑ̆x\r\nʔaimas×+	ʔaimas×+	æːmsɑ̆x\r\nʔaimur×+	ʔaimur×+	æːmrɑ̆x\r\nʔaimurla×+	ʔaimurla×+	æːmɑ̆rlɑ̆x\r\nʔailadxa×+	ʔailadxa×+	æːltɡɑ̆x\r\nʔailad×+	ʔailad×+	æːldɑ̆x\r\nʔailugla×+	ʔailugla×+	æːlɑ̆ɡlɑ̆x\r\nʔailga×+	ʔailga×+	æːlɡɑ̆x\r\nʔailsa×+	ʔailsa×+	æːlsɑ̆x\r\nʔailsi×+	ʔailsi×+	æːlʃɪx\r\nʔailčila×+	ʔailčila×+	æːlʧlɑ̆x\r\nʔaisu×+	ʔaisu×+	æːsɑ̆x\r\nʔaidaŋguila×+	ʔaidaŋguila×+	æːdɑ̆ŋɡʊɪlɑ̆x';
	  var text_dict = 'ᡄᡄᡅᡅᠪᡄᡅᡅᡍᡇ‌	ʔaibai×+	æːbɪːx\r\nᡄᡄᡅᡅᠪᡄᠯᡔᡄᡍᡇ‌	ʔaibalǰa×+	æːbɑ̆lʤɪx\r\nᡄᡄᡅᡅᠪᡆᠷᠯᡄᡍᡇ‌	ʔaiburla×+	æːbɑ̆rlɑ̆x\r\nᡄᡄᡅᡅᡍᡇ‌	ʔai×+	æːx\r\nᡄᡄᡅᡅᡎᡆᡆᡄᡍᡄᡍᡇ‌	ʔaigudxa×+	æːɡʊːtɡɑ̆x\r\nᡄᡄᡅᡅᡏᡄᡍᡇ‌	ʔaima×+	æːmɑ̆x\r\nᡄᡄᡅᡅᡏᡄᡍᠯᡄᡍᡇ‌	ʔaimagla×+	æːmɑ̆ɡlɑ̆x\r\nᡄᡄᡅᡅᡏᡄᡍᠴᡅᠯᡄᡍᡇ‌	ʔaimagčila×+	æːmɑ̆ɡʧlɑ̆x\r\nbbb‌	ʔaimas×+	æːmsɑ̆x\r\nᡄᡄᡅᡅᡏᡆᠷᡍᡇ‌	ʔaimur×+	æːmrɑ̆x\r\nᡄᡄᡅᡅᡏᡆᠷᠯᡄᡍᡇ‌	ʔaimurla×+	æːmɑ̆rlɑ̆x\r\nᡄᡄᡅᡅᠯᡄᡆᡄᡍᡄᡍᡇ‌	ʔailadxa×+	æːltɡɑ̆x\r\nᡄᡄᡅᡅᠯᡄᡆᡄᡍᡇ‌	ʔailad×+	æːldɑ̆x\r\nᡄᡄᡅᡅᠯᡆᡍᠯᡄᡍᡇ‌	ʔailugla×+	æːlɑ̆ɡlɑ̆x\r\nᡄᡄᡅᡅᠯᡎᡄᡍᡇ‌	ʔailga×+	æːlɡɑ̆x\r\nᡄᡄᡅᡅᠯᠰᡄᡍᡇ‌	ʔailsa×+	æːlsɑ̆x\r\nᡄᡄᡅᡅᠯᠰᡅᡍᡇ‌	ʔailsi×+	æːlʃɪx\r\nᡄᡄᡅᡅᠯᠴᡅᠯᡄᡍᡇ‌	ʔailčila×+	æːlʧlɑ̆x\r\nᡄᡄᡅᡅᠰᡆᡍᡇ‌	ʔaisu×+	æːsɑ̆x\r\nᡄᡄᡅᡅᡑᡄᡄᡘᡎᡆᡅᡅᠯᡄᡍᡇ‌	ʔaidaŋguila×+	æːdɑ̆ŋɡʊɪlɑ̆x';

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
		  objectStore.add({ id: i, graph: items[0], xlit: items[1], phone: items[2] });
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
	}
	catch(err) {
	}
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
  } else {  }
  console.log('716:', innerHTML);
  document.getElementById("lemmas").innerHTML = innerHTML;
  //return innerHTML;
};

}
/*
function read() {
	var transaction = db.transaction(["lexeme"]);
	var objectStore = transaction.objectStore("lexeme");
	var request = objectStore.get("00-03");
	
	request.onerror = function(event) {
	   alert("Unable to retrieve daa from database!");
	};
	
	request.onsuccess = function(event) {
	   // Do something with the request.result!
	   if(request.result) {
		  alert("Name: " + request.result.name + ", 
			 Age: " + request.result.age + ", Email: " + request.result.email);
	   } else {
		  alert("Kenny couldn't be found in your database!");
	   }
	};
}
*/





/*
// Note: JS has no regressive assertion.
// Transforming (?<![SET])(STRING) -> $1 into (^|[^SET])(STRING) -> $1$2 will work in some cases.
// Transcrypt'ed from Python, 2020-09-02 11:51:32
var re = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_re__ from './re.js';
__nest__ (re, '', __module_re__);
var __name__ = '__main__';
export var refresh_LB_match = function (event) {
	if (typeof event == 'undefined' || (event != null && event.hasOwnProperty ("__kwargtrans__"))) {;
		var event = null;
	};
	LB_match.delete (0, END);
	ENTRY_search.select_clear ();
	var key = tvar_ENTRY_search.py_get ().strip (' \n');
	match_list = [];
	if (!(key)) {
		match_list = lookup (__kwargtrans__ ({where_term: '"ID" = ' + str (randint (-(43), 26433)), search_field: 'ID', return_field: '*'}));
	}
	else if (key [0] >= '一' && key [0] <= '鿿') {
		match_list = match_list + lookup (__kwargtrans__ ({key: ('.*' + key) + '.*', search_field: 'S2', return_field: '*', flag_regex: 1}));
	}
	else {
		if (re.search ('[A-Za-z]|[͏᠋᠌᠍ ᠎᠇ᠠᠡᠢᠣᠤᠥᠦᠧᠨᠩᠬᠭᠮᠲᠳᠵᠶᠸᠺᠻᠾᡀ]', key)) {
			var key = pinyin2graph (key);
		}
		if (0) {
			var key = re.sub ('^(.*)(ᡃ)᠊$', '\\1\\2$|^\\1ᡄ᠊', key);
			var key = re.sub ('^(.*)(ᡉ)᠊$', '\\1\\2$|^\\1ᡆᡅ᠊', key);
			var key = re.sub ('^(.*)(ᡇ‌)᠊$', '\\1\\2$|^\\1ᡆ᠊', key);
			var key = re.sub ('^(.*)(ᡍ)᠊$', '\\1\\2$|^\\1ᡎᡆ᠊', key);
			var key = re.sub ('^(.*)(ᡈ)᠊$', '\\1\\2$|^\\1ᡑᡆ᠊', key);
			var key = re.sub ('^(.*)(ᡆᡄ)᠊$', '\\1\\2$|^\\1ᡑᡆ᠊$|^\\1ᡆᡊᡆ᠊', key);
			var key = re.sub ('^(.*)(ᡄ)᠊$', '\\1\\2$|^\\1ᡊᡆ᠊', key);
		}
		var __left0__ = re.subn ('᠊', '.*', key);
		var key = __left0__ [0];
		var flag_regex = __left0__ [1];
		if (re.subn ('[ ᠠ-ᢪ]', '', key)) {
			var flag_regex = 1;
		}
		match_list = match_list + lookup (__kwargtrans__ ({key: key, search_field: 'F', return_field: '*', flag_regex: flag_regex}));
		match_list = match_list + lookup (__kwargtrans__ ({key: key, search_field: 'F2', return_field: '*', flag_regex: flag_regex}));
		var lemmma_list = deconjugate (__kwargtrans__ ({form: key, suffix_lists: suffix_lists, if_infer_stem_mf: 0, if_dict: 1, if_bare_stem: 1}));
		print (lemmma_list);
		for (var lemma of lemmma_list) {
			if (lemma != key) {
				match_list = match_list + lookup (__kwargtrans__ ({key: lemma, search_field: 'F', return_field: '*', flag_regex: 0, flag_verb_only: 1}));
			}
		}
	}
	try {
		for (var match of match_list) {
			var if_chn = v_CB_chn.py_get ();
			var form = match [1];
			if (if_chn == 0) {
				var form = form.py_replace ('ᡗ', 'ᠻ');
			}
			LB_match.insert (END, (form + ' ') + match [3]);
		}
		LB_match.selection_set (__kwargtrans__ ({first: 0}));
		refresh_TEXT_dict ();
	}
	catch (__except0__) {
		// pass;
	}
};

//# sourceMappingURL=refresh_LB_match.map
*/
