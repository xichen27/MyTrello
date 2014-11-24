TrelloClone.Routers.Router = Backbone.Router.extend({

	initialize: function(body, boards){
		this.boards = boards;
		this.$body = body;
	},

	routes: {
		"": "boardIndex",
		"boards/:id": "boardShow",
	},

	boardIndex: function(){
		var view = new TrelloClone.Views.BoardIndex({collection: this.boards});
		this.$body.html(view.render().$el);
	},

	boardShow: function(id){
		var board = this.boards.getOrFetch(id);
		var view = new TrelloClone.Views.BoardShow({model: board});
		this.$body.html(view.render().$el);
	}

})