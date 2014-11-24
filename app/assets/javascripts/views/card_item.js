
TrelloClone.Views.CardItem = Backbone.View.extend({
	template: JST["boards/card_item"],
	tagName: "li",
	className: "card-item",
	events: {
		"click button.delete-card": "deleteCard"
	},

	render: function(){
		var content = this.template({card: this.model});
		this.$el.html(content);
		return this;
	},

	deleteCard: function(events){
		events.preventDefault();
		this.model.destroy();
	}

})

