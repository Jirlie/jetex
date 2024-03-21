import frappe
from frappe import _

def get_context(context):
	if frappe.session.user == "Guest":
		frappe.throw(_("Log in to access this page."), frappe.PermissionError)
	

	hooks = frappe.get_hooks()
	try:
		boot = frappe.sessions.get()
	except Exception as e:
		raise frappe.SessionBootFailed from e
	all = frappe.db.get_all("House Keeping", filters={'employee': frappe.session.user, 'workflow_state': "Ready for Collection"})
	docs = []
	for all in all:
		doc = frappe.get_doc("House Keeping", all.name)
		docs.append(doc)
	context.ready = docs
	

	return context

