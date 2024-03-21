import frappe
import json


@frappe.whitelist(allow_guest=True)
def laundary(user, details2):
    doc = frappe.new_doc("Laundry")
    doc.employee = user
    for details in details2:
        doc.append('product_details',{
            'product': details.get('product'),
            'quantity': details.get('quantity')
        })
    doc.insert(ignore_permissions=True)
    return doc.name


@frappe.whitelist(allow_guest=True)
def damage(user, details2):
    doc = frappe.new_doc("Damage Report")
    doc.employee = user
    for details in details2:
        doc.append('product_details',{
            'product': details.get('product'),
            'quantity': details.get('quantity')
        })
    doc.insert(ignore_permissions=True)
    return doc.name

@frappe.whitelist(allow_guest=True)
def lost(user, details2):
    doc = frappe.new_doc("Lost Item")
    doc.employee = user
    for details in details2:
        doc.append('product_details',{
            'product': details.get('product'),
            'quantity': details.get('quantity')
        })
    doc.insert(ignore_permissions=True)
    return doc.name

@frappe.whitelist(allow_guest=True)
def marketing(user, details2, from_date=None, to_date=None):
    doc = frappe.new_doc("Marketing Request")
    doc.employee = user
    doc.from_date = from_date
    doc.to_date = to_date
    for details in details2:
        doc.append('product_details',{
            'product': details.get('product'),
            'quantity': details.get('quantity')
        })
    doc.insert(ignore_permissions=True)
    return doc.name