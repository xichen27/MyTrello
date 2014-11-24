TrelloClone.Collections.Boards = Backbone.Collection.extend({
	url: "api/boards",
	model: TrelloClone.Models.Board,

	comparator: function(list){
		return list.get("ord")
	},

	getOrFetch: function(id){
		var board = this.get(id);
		var that = this; 
		if (!board){
			var board = new TrelloClone.Models.Board({id: id});
			board.fetch({
				success: function(){
					that.add(board);
				}
			})
		} else {
			board.fetch();
		}
		return board;
	}

})