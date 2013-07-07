"use strict";
(function(exports){
	exports.intersect = function (a, b){
		var ai=0, bi=0;
		var result = [];

		while( ai < a.length && bi < b.length )
		{
			if (a[ai] < b[bi] ){ ai++; }
			else if (a[ai] > b[bi] ){ bi++; }
			else
			{
				result.push(a[ai]);
				ai++;
				bi++;
			}
		};
		return result;
	};
})(exports.Util = {});
