import frappe

def get_context(context):
    context.pending_laundry = frappe.db.sql("""select * from `tabLaundry` where `workflow_state` = 'Pending' and `employee` = %s""", frappe.session.user, as_dict=True)
    context.pending_damage = frappe.db.sql("""select * from `tabDamage Report` where `workflow_state` = 'Pending' and `employee` = %s""", frappe.session.user, as_dict=True)
    context.pending_lost = frappe.db.sql("""select * from `tabLost Item` where `workflow_state` = 'Pending' and `employee` = %s""", frappe.session.user, as_dict=True)
    context.approved_laundry = frappe.db.sql("""select * from `tabLaundry` where `workflow_state` = 'Approved' and `employee` = %s""", frappe.session.user, as_dict=True)
    context.approved_damage = frappe.db.sql("""select * from `tabDamage Report` where `workflow_state` = 'Approved' and `employee` = %s""", frappe.session.user, as_dict=True)
    context.approved_lost = frappe.db.sql("""select * from `tabLost Item` where `workflow_state` = 'Approved' and `employee` = %s""", frappe.session.user, as_dict=True)
    context.rejected_laundry = frappe.db.sql("""select * from `tabLaundry` where `workflow_state` = 'Rejected' and `employee` = %s""", frappe.session.user, as_dict=True)
    context.rejected_damage = frappe.db.sql("""select * from `tabDamage Report` where `workflow_state` = 'Rejected' and `employee` = %s""", frappe.session.user, as_dict=True)
    context.rejected_lost = frappe.db.sql("""select * from `tabLost Item` where `workflow_state` = 'Rejected' and `employee` = %s""", frappe.session.user, as_dict=True)

    all = frappe.db.get_all("Laundry", filters={'employee': frappe.session.user, 'workflow_state': "Rejected"})
    docs = []
    for all in all:
        doc = frappe.get_doc("Laundry", all.name)
        docs.append(doc)
    context.laundry = docs

    all2 = frappe.db.get_all("Lost Item", filters={'employee': frappe.session.user, 'workflow_state': "Rejected"})
    docs = []
    for all in all2:
        doc = frappe.get_doc("Lost Item", all.name)
        docs.append(doc)
    context.lost = docs
	

    all3 = frappe.db.get_all("Damage Report", filters={'employee': frappe.session.user, 'workflow_state': "Rejected"})
    docs = []
    for all in all3:
        doc = frappe.get_doc("Damage Report", all.name)
        docs.append(doc)
    context.damage = docs
    return context
