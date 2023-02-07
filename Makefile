install:    #Эта команда полезна при первом клонировании репозитория (или после удаления node_modules)
	npm ci

link:       #Установка пакетов
	sudo npm link

lint:		#Проверка линтером
	npx eslint .

test:
		NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
		NODE_OPTIONS=--experimental-vm-modules npx jest --coverage


