/**
 * This file serves to keep fixtures for for tests and storybook sane and dry.
 * helpers here follow proptypes defined in proptypes.js or individual components
 */

export const listItemHelper = ({
  title = 'PR ID: 3792740',
  desc = 'Corrugated Boxes',
  meta = [{ icon: 'shopping_cart', text: '4 products' }, { icon: 'access_time', text: '2 hrs'}],
}) => ({
  title,
  desc,
  meta
});

export const excerptHelper = ({
  title =  'CB5 | Tata Cliq Corrugated Box 20cm x 10cm x 9cm 3 Ply',
  figure = 'https://i2.wp.com/www.graphicsfuel.com/wp-content/uploads/2012/01/cardboard-box-icon-512x512.png',
  description = {
    label: 'Pack Size',
    value: '1,000 units'
  },
}) => ({
  title,
  figure,
  description
});

export const ticketHelper = ({ 
  id = Math.floor(Math.random() * 1000),
  reference_number, 
  status = 'open', 
  isSelected = false, 
  creator = { id: 1, creator_name: 'TestBali' }, 
  created_at = new Date().toUTCString(), 
  subject = "Sample Ticket",   
  ticket_category = {
    category: 'Orders and Products',
    sub_category: 'Tracking',
    sub_sub_category: 'Completion Issues'
  }
}) => ({
  id,
  reference_number,
  status,
  isSelected,
  creator,
  subject,
  created_at,
  ticket_category
});

export const commentHelper = ({
  content = 'Sample Content',
  creator_name = 'TestBali',
  creator = 1,
  isPrivate = false,
  self = false,
  created_at = new Date().toUTCString(),
}) => ({
  content,
  creator_name,
  isPrivate,
  creator,
  self,
  created_at
});

export const filterHelper = ({ 
  type = 'search',
  value = 'Batman',
  displayValue = 'Batman',
  label = 'Batman',
}) => ({
  type,
  value,
  displayValue,
  label
});

export const activeTicketHelper = ({
  id = 1,
  reference_number = '#R-321312313123',
  subject = 'Sample Subject',
  estimated_tat = new Date().toUTCString(),
  entity_id = 1,
  entity_type = 'purchase_order',
  created_at = new Date().toUTCString(),
  updated_at = new Date().toUTCString(),
  status = 'open',
  description = 'Sample Description',
  creator = {
    id: 1,
    creator_type: 'admin_user',
    creator_name: 'TestBali'
  },
  ticket_category = {
    category: 'Order & Products',
    sub_category: 'Tracking',
    sub_sub_category: 'Completion Issues'
  },
  source = 'lead_plus',
  comments = [],
  attachments = []
})  => ({
  id,
  reference_number,
  subject,
  estimated_tat,
  entity_id,
  entity_type,
  created_at,
  updated_at,
  status,
  description,
  creator,
  ticket_category,
  source,
  comments,
  attachments,
});
