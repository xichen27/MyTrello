
TrelloClone.Views.CardItem = Backbone.View.extend({
	template: JST["boards/card_item"],

	tagName: "li",

	className: "card-item",

	// attributes: function(){return {
	// 	"data-list-id": this.model.get("list_id")
	// }},

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

