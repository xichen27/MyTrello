TrelloClone.Views.ListItem = Backbone.CompositeView.extend({
	template: JST["boards/list_item"],
	tagName: "div",

	initialize: function(){
		this.cards = this.model.cards();
		this.listenTo(this.cards, "add", this.addCard);
		this.listenTo(this.cards, "remove", this.removeCard);
		this.cards.each(function(card){
			this.addCard(card);
		}.bind(this))
	},

	events: {
		// "sortstart .lists-list": "beginSortList",
		"sortstop .cards-list": "endSortList"
	},


	addCard: function(card){
		var new_card = new TrelloClone.Views.CardItem({model: card});
		new_card.$el.data("list-id", card.get("list_id"));
		this.addSubview(".cards-list", new_card);
	},

	removeCard: function(card){
		var remove_card = _.find(this.subviews(".cards-list"), function(subview){
			return subview.model === card;
		});
			this.removeSubview(".cards-list", remove_card)
	},

	addForm: function(){
		var card_form = new TrelloClone.Views.CardForm({model:this.model, collection: this.cards});
		this.addSubview("div.card-form", card_form)
	},

	render: function(){
		var content = this.template({list: this.model});
		this.$el.html(content);
		this.$el.addClass("list-item");
		this.attachSubviews();
		this.addForm();
		this.onRender();
		return this;
	},
		
	onRender: function(){
		// Backbone.CompositeView.prototype.onRender.call(this);
		console.log('sortableizing');
		this.$('.cards-list').sortable({connectWith: ".cards-list"})
	}

})


	


