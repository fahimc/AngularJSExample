var DirectiveUtil = {
	make : function(restrict,scope,template,templateURL,transculde) {
		var obj = {
			transclude:transculde?transculde:null,
			restrict : restrict,
			scope : scope,
			template :template,
			templateUrl:templateURL
		};
		return obj;
	}
};

