.PHONY: component
init:
	make install-dependencies
	make configure-hooks
	make move-config-files
configure-hooks:
	@echo "Configuring git hooks"
	git config core.hooksPath .githooks
install-dependencies:
	@echo "Installing dependencies"
	yarn 
migrate-repo:
	@cd ../
	@echo "Deleting go-bits directory if already present"
	@rm -rf go-bits
	@echo "Cloning go-bits"
	git clone git@github.com:Bizongo/go-bits.git
	@cd go-bits
	@echo "Setting up go-bits"
	make init
	@rm -rf ../react-bits
	@rm -rf ./go-bits
move-config-files:
	@echo "Moving .npmrc.example to .npmrc"
	@echo "Don't forget to replace token in .npmrc"
	@cp .npmrc.example .npmrc
component:
	@read -p "Enter Component Name: " component; \
	export component=$$component; \
	make brew-component; \
	echo "Done."
brew-component:
	@echo "Brewing component..."; \
	echo "Copying component to src/components/$$component"; \
	mkdir src/components/$$component; \
	export src=index dist=index name=$$component; make prepare-component-file; \
	export src=Component dist=$$component name=$$component; make prepare-component-file; \
	export src=Component.stories dist=$$component.stories name=$$component; make prepare-component-file; \
	export src=Component.fixtures dist=$$component.fixtures name=$$component; make prepare-component-file; \
	export src=Component.loader dist=$$component.loader name=$$component; make prepare-component-file; \
	export src=Component.spec dist=$$component.spec name=$$component; make prepare-component-file;
prepare-component-file:
	@cp .templates/Component/$$src.js src/components/$$name/$$dist.js; \
	sed -i "" 's/Component/$(name)/g' src/components/$$name/$$dist.js;

