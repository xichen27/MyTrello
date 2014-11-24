TrelloClone.Views.ListForm = Backbone.View.extend({
	template: JST["boards/list_form"],

	events: {
		"submit form.list-form": "createList"
	},
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this
	},

	createList: function(event){
		event.preventDefault();
		var $target = $(event.currentTarget)
		var data = $target.serializeJSON();
		var that = this;
		var new_list = new TrelloClone.Models.List();
		this.collection.create({
			title: data.title,
			board_id: this.model.id
		});
		this.render();
	}

})

 