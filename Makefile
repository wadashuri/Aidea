SAIL := ./vendor/bin/sail

build:
	$(SAIL) build

up:
	$(SAIL) up -d
	npm run dev

down:
	$(SAIL) down

fresh-seed:
	$(SAIL) artisan migrate:fresh --seed

cache-clear:
	$(SAIL) artisan view:clear
	$(SAIL) artisan config:clear
	$(SAIL) artisan route:clear
	$(SAIL) artisan cache:clear