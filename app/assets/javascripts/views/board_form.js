TrelloClone.Views.BoardForm = Backbone.View.extend({
	template: JST["boards/board_form"],

	events: {
		"submit form": "createBoard"
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this
	},

	createBoard: function(event){
		event.preventDefault();
		var $target = $(event.currentTarget)
		var data = $target.serializeJSON();
		var board = new TrelloClone.Models.Board();
		
		board.save(data, {
			success: function(model, response, options){
				window.TrelloClone.boards.add(response)
				var id = response.id
				Backbone.history.navigate("boards/" + id, {trigger: true})
			}
		})
	}

})