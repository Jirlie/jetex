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
	context.qty = frappe.get_all("Bin", filters={"custom_user_id": "emp@emp.com", "actual_qty": [">", 0]}, fields=["item_code", "custom_item_name", "custom_item_image", "actual_qty"])

	return context