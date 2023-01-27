install:    #Эта команда полезна при первом клонировании репозитория (или после удаления node_modules)
	npm ci

link:       #Установка пакетов
	sudo npm link

lint:		#Проверка линтером
	npx eslint .

test:
		npm test

test-coverage:
		npm test -- --coverage --coverageProvider=v8


