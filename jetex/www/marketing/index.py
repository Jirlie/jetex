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
	employee = frappe.db.sql("""select * from `tabEmployee` where `user_id` = %s""", frappe.session.user, as_dict=True)
	if context.item:
		context.item = frappe.get_doc("Employee Position", employee[0].custom_employee_position)
	else:
		context.item = frappe.get_doc("Employee Position", "ALL")
	return context