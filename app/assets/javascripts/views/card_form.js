TrelloClone.Views.CardForm = Backbone.View.extend({
	template: JST["boards/card_form"],

	events: {
		"submit form.card-form": "createCard",
		"click a.add-card": "showCardForm"
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this
	},

	showCardForm: function(events){
		events.preventDefault();
		this.$el.find("form.card-form").removeClass("hidden");
		this.$el.find("a.add-card").addClass("hidden");
	},

	createCard: function(event){
		event.preventDefault();
		// var $target = $(event.currentTarget)
		// var data = $target.serializeJSON();
		var that = this;
		var new_card = new TrelloClone.Models.Card();
		this.collection.create({
			title: this.$('textarea').val(),
			list_id: that.model.id
		}, {wait: true});
		this.render();
		this.$el.find("a.add-card").removeClass("hidden");
		this.$el.find("form.card-form").addClass("hidden");
	}

})

