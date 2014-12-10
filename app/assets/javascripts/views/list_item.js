TrelloClone.Views.ListItem = Backbone.CompositeView.extend({
	template: JST["boards/list_item"],
	tagName: "div",

	initialize: function(options){

		this.board = options.board;
		this.cards = this.model.cards();
		this.listenTo(this.cards, "add", this.addCard);
		this.listenTo(this.cards, "remove", this.removeCard);

		this.cards.each(function(card){
			this.addCard(card);
		}.bind(this))
	},

	events: {
		"sortstart .cards-list": "beginSortCard",
		"sortstop .cards-list": "endSortCard",
		"sortreceive .cards-list": "endReceiveCard"
	},

	beginSortCard: function(event){
		var $target = $(event.toElement);
		$target.addClass("dragged")
	},

	assignOrd: function(){
		_(this.subviews('.cards-list')).each(function(subview){
			var ord = subview.$el.index();
			subview.model.set({ord: ord});
			subview.model.save();
		})
	},

	endSortCard: function(event){
		var $target = $(event.toElement);
		$target.removeClass("dragged");
		this.assignOrd();
	},

	endReceiveCard: function(event, ui){
		var $target = $(event.toElement);
		$target.removeClass("dragged");
		var senderListId = ui.sender.data("list-id");
		var senderList = this.board.lists().get(senderListId);
		var card = senderList.cards().get($target.data("id"))
		card.set("list_id", this.model.id);
		card.save();
		this.assignOrd();
	},

	attributes: function () {
		return {
			"data-list-id": this.model.id
		};
	},

	addCard: function(card){
		var new_card = new TrelloClone.Views.CardItem({model: card});

		new_card.$el.attr("data-list-id", card.get("list_id"));
		new_card.$el.attr("data-id", card.get("id"));
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


	


