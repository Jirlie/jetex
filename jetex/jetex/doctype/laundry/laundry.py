# Copyright (c) 2024, Mohammed Nasser and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Laundry(Document):
	def on_submit(self):
		doc = frappe.get_doc({
			'doctype': 'House Keeping',
			'employee': self.employee
		})
		for product in self.product_details:
			doc.append('product_details',{
				'product': product.product,
				'size': product.size,
				'quantity': product.quantity
			})

		doc.insert(ignore_permissions=True)
