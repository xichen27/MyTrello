TrelloClone.Views.BoardIndexItem = Backbone.View.extend({
	tagName: "li",
	template: JST["boards/index_item"],
	className: "board-item",
	events: {
		"click button.delete-board": "deleteBoard"
	},


	render: function(){
		var content = this.template({board: this.model});
		this.$el.html(content);
		return this;
	},

	deleteBoard: function(){
		this.model.destroy();
	}


})