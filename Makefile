default: unit

unit:
	@expresso -t 200 -I test -I lib -s test/unit/*.test.js

.PHONY: unit
