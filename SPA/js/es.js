var Aggregate = function(){
	var events = [];
	return {
		when: function(match){
			state = match.$init ? match.$init : {};
			for (var i = 0; i < events.length; i++) {
				if(match[events[i].type] && events[i].data)
					state = match[events[i].type](state, events[i].data);
			}
			return state;
		},
		emit: function(event){
			events.push(event);
		}
	}
};